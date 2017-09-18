'use strict';

// Module imports
var log = require('npmlog-ts')
  , util = require('util')
  , async = require('async')
  , express = require('express')
  , cors = require('cors')
  , http = require('http')
  , bodyParser = require('body-parser')
  , _ = require('lodash')
  , commandLineArgs = require('command-line-args')
  , getUsage = require('command-line-usage')
  , exec = require('child_process').exec
  , fs = require('fs')
;

// Misc BEGIN
const PROCESSNAME = "Wedo Hospitality Demo - Admin Server"
    , VERSION  = "v1.0"
    , AUTHOR   = "Carlos Casares <carlos.casares@oracle.com>"
    , PROCESS  = 'PROCESS'
    , REST     = 'REST'
    , OS       = 'OS'
;

log.timestamp = true;
// Misc END

// Initialize input arguments
const optionDefinitions = [
  { name: 'config', alias: 'c', type: String },
  { name: 'help', alias: 'h', type: Boolean },
  { name: 'verbose', alias: 'v', type: Boolean, defaultOption: false }
];

const sections = [
  {
    header: PROCESSNAME,
    content: ''
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'config',
        typeLabel: '[underline]{filename}',
        alias: 'c',
        type: String,
        description: 'Config file'
      },
      {
        name: 'verbose',
        alias: 'v',
        description: 'Enable verbose logging.'
      },
      {
        name: 'help',
        alias: 'h',
        description: 'Print this usage guide.'
      }
    ]
  }
]
var options = undefined;

try {
  options = commandLineArgs(optionDefinitions);
} catch (e) {
  console.log(getUsage(sections));
  console.log(e.message);
  process.exit(-1);
}

if (options.help || !options.config) {
  console.log(getUsage(sections));
  process.exit(0);
}

/**
if (!fs.accessSync(options.config, fs.constants.R_OK)) {
  console.log("File %s does not exist or is not readable", options.config);
  process.exit(0);
}
**/

log.level = (options.verbose) ? 'verbose' : 'info';

const config = require(options.config);

// Initializing REST & WS variables BEGIN
const PORT = 1111
    , CONTEXTROOT = '/admin'
    , OPURI       = '/:component/:op/:params?'
;

var app    = express()
  , router = express.Router()
  , server = http.createServer(app)
  , messenger = _.noop()
;
// Initializing REST & WS variables END

var component = _.noop()
  , operation = _.noop()
;

// Main handlers registration - BEGIN
// Main error handler

process.on('uncaughtException', function (err) {
  console.log("Uncaught Exception: " + err);
  console.log("Uncaught Exception: " + err.stack);
});

process.on('SIGINT', function() {
  log.info(PROCESS, "Caught interrupt signal");
  log.info(PROCESS, "Exiting gracefully");
  process.removeAllListeners()
  if (typeof err != 'undefined')
    log.error(PROCESS, err)
  process.exit(2);
});
// Main handlers registration - END

// Main initialization code

async.series( {
  splash: function(callbackMainSeries) {
    log.info(PROCESS, "%s - %s", PROCESSNAME, VERSION);
    log.info(PROCESS, "Author - %s", AUTHOR);
    callbackMainSeries(null);
  },
  rest: function(callbackMainSeries) {
    log.info(PROCESS, "Using configuration file: '%s'", options.config);
    log.info(REST, "Initializing REST Server");
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(CONTEXTROOT, router);
    router.get('/', (req, res) => {
      var response = _.cloneDeep(config);
      _.forEach(response.components, (c) => {
        _.forEach(c.actions, (a) => {
          // We don't want to unveil the actual command
          delete a.command;
        });
      });
      res.status(200).json(response);
      return;
    });
    router.get(OPURI, (req, res) => {
      if (!req.params.component) {
        var msg = "Missing component";
        log.error(REST, msg);
        res.status(400).send(msg);
        return;
      }
      if (!req.params.op) {
        var msg = "Missing operation";
        log.error(REST, msg);
        res.status(400).send(msg);
        return;
      }

      var err = assertRequest('GET', req.params.component, req.params.op);
      if (err) {
        log.error(REST, err);
        res.status(400).send(err);
        return;
      }

      execOp(req, res);
    });
    router.post(OPURI, (req, res) => {
      if (!req.params.component) {
        var msg = "Missing component";
        log.error(REST, msg);
        res.status(400).send(msg);
        return;
      }
      if (!req.params.op) {
        var msg = "Missing operation";
        log.error(REST, msg);
        res.status(400).send(msg);
        return;
      }

      var err = assertRequest('POST', req.params.component, req.params.op);
      if (err) {
        log.error(REST, err);
        res.status(400).send(err);
        return;
      }

      execOp(req, res);
    });
    server.listen(PORT, function() {
      log.info(REST, "REST Server initialized successfully at http://localhost:%d%s", PORT, CONTEXTROOT + OPURI);
      callbackMainSeries(null);
    });
  }
}, function(err, results) {
  if (err) {
    log.error("Error during initialization: " + err);
  } else {
    log.info(PROCESS, 'Initialization completed');
  }
});

function assertRequest(verb, component, op) {
  var c = _.find(config.components, ['component', component]);
  if (!c) {
    return util.format("Component '%s' not found in config file. Valid components for this server ('%s') are: %s", component, config.server, _.map(config.components, 'component').toString());
  }
  var o = _.find(c.actions, ['action', op]);
  if (!o) {
    return util.format("Operation '%s' not found for component '%s'. Valid operations are: %s", op, c.component, _.map(c.actions, 'action').toString());
  }
  if (o.verb !== verb) {
    return util.format("Operation '%s' not found for component '%s' and verb '%s'.", op, c.component, verb);
  }
  return _.noop();
}

function execOp(req, res) {
  // All ok, let's point to the right object
  component = _.find(config.components, ['component', req.params.component]);
  operation = _.find(component.actions, ['action', req.params.op]);

  if (operation.params) {
    // Operation has params, let's check if those have been sent
    // TODO
    if (!req.body) {
      var msg = "Missing operation payload";
      log.error(REST, msg);
      res.status(400).send(msg);
      return;
    }
  }

  log.verbose(REST, "Incoming request for component '%s', operation '%s'%s", component.component, operation.action, (operation.params) ? " and parameters: '" + JSON.stringify(req.body) + "'" : "");

  log.verbose(OS, "Executing action '%s'", operation.action);
  exec(operation.command, (err, stdout, stderr) => {
    if (err) {
      log.error(OS, err.message);
      res.status(500).send(err.message);
      return;
    }
    var result = stdout + stderr;
    res.status(200).send(result);
    log.verbose(OS, "Command executed successfully. Results:");
    log.verbose(OS, result);
  });
}
