module.exports = {
	server: 'EV3',
	components: [
		{
			component: "os",
	    description: "OS operations",
	    actions: [
	      {
					verb: "POST",
	        action: "reboot",
	        description: "Reboot",
	        command: "sudo shutdown -r now",
					preresponse: true
	      },
	      {
					verb: "POST",
	        action: "shutdown",
	        description: "Shutdown",
	        command: "sudo shutdown now",
					preresponse: true
	      },
	      {
					verb: "GET",
	        action: "ip",
	        description: "Get local IP",
	        command: "hostname -I"
	      },
				{
					verb: "GET",
	        action: "version",
	        description: "Get image version",
	        command: "cat /version"
	      },
				{
					verb: "GET",
	        action: "ping",
	        description: "Ping the RPi",
	        command: "echo pong"
	      },
	    ]
		},
		{
	    component: "arm",
	    description: "Truck Controller",
	    actions: [
	      {
					verb: "POST",
	        action: "pid",
	        description: "Return the PID of the process if it's running",
	        command: "cat /home/robot/.pm2/pids/legoroboarm*.pid"
	      },
	      {
					verb: "POST",
	        action: "start",
	        description: "Start the process",
	        command: "pm2 start legoroboarm"
	      },
	      {
					verb: "POST",
	        action: "stop",
	        description: "Stop the process",
	        command: "pm2 stop legoroboarm"
	      },
	      {
					verb: "POST",
	        action: "restart",
	        description: "Restart the process",
	        command: "old=`ps -ef | grep legoroboarm | grep -v grep | awk '{print $2}'`;pm2 restart legoroboarm > /dev/null; echo \"Old PID: $old. New PID:\" `pm2 pid legoroboarm`"
	      },
				{
					verb: "POST",
	        action: "startarm",
	        description: "Start the arm",
	        command: "curl http://localhost:8081/initialize/ > /dev/null 2>&1;curl -s http://localhost:8081/move_start/"
	      },
				{
					verb: "POST",
	        action: "stoparm",
	        description: "Stop the legoroboarm",
	        command: "curl -s http://localhost:8081/move_stop/"
	      }
	    ]
	  },
		{
			component: "iot",
			description: "IoT Controller",
			actions: [
				{
					verb: "POST",
					action: "pid",
					description: "Return the PID of the process if it's running",
					command: "cat /home/robot/.pm2/pids/iot_mvn_program*.pid"
				},
				{
					verb: "POST",
					action: "start",
					description: "Start the process",
					command: "pm2 start iot_mvn_program"
				},
				{
					verb: "POST",
					action: "stop",
					description: "Stop the process",
					command: "pm2 stop iot_mvn_program"
				},
				{
					verb: "POST",
					action: "restart",
					description: "Restart the process",
					command: "old=`ps -ef | grep spring-boot | grep -v grep | awk '{print $2}'`;pm2 restart iot_mvn_program > /dev/null; echo \"Old PID: $old. New PID:\" `pm2 pid iot_mvn_program`"
				}
			]
		}
	]
}
