module.exports = {
	server: 'SENSORS',
	components: [
		{
			component: "os",
	    description: "OS operations",
			actions: [
	      {
					verb: "POST",
	        action: "reboot",
	        description: "Reboot",
	        command: "sudo shutdown -r now"
	      },
	      {
					verb: "POST",
	        action: "shutdown",
	        description: "Shutdown",
	        command: "sudo shutdown now"
	      },
	      {
					verb: "POST",
	        action: "ip",
	        description: "Get local IP",
	        command: "hostname -I"
	      }
	    ]
		},
	  {
	    component: "wrapper",
	    description: "IoTCS Wrapper",
	    actions: [
	      {
					verb: "POST",
	        action: "pid",
	        description: "Return the PID of the process if it's running",
					command: "cat /home/pi/.pm2/pids/hackathonwrapper*.pid"
	      },
	      {
					verb: "POST",
	        action: "start",
	        description: "Start the process",
	        command: "pm2 start hackathonwrapper"
	      },
	      {
					verb: "POST",
	        action: "stop",
	        description: "Stop the process",
	        command: "pm2 stop hackathonwrapper"
	      },
	      {
					verb: "POST",
	        action: "restart",
	        description: "Restart the process",
	        command: "pm2 restart hackathonwrapper"
	      }
	    ]
	  }
	]
}
