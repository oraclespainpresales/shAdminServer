module.exports = {
	server: 'KIOSKIN',
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
			component: "nuki",
			description: "NUKI workaround",
			actions: [
	      {
					verb: "GET",
	        action: "UNLATCH",
	        description: "UNLATCH door",
					command: "curl -X GET \"http://nuki:8080/lockAction?nukiId=115675265&token=s3z1TG&action=3\""
	      }
			]
		},
	  {
	    component: "cozmo",
	    description: "Cozmo controller in Python",
	    actions: [
	      {
					verb: "POST",
	        action: "pid",
	        description: "Return the PID of the process if it's running",
					command: "cat /home/pi/.pm2/pids/cozmo*.pid"
	      },
	      {
					verb: "POST",
	        action: "start",
	        description: "Start the process",
	        command: "pm2 start cozmo"
	      },
	      {
					verb: "POST",
	        action: "stop",
	        description: "Stop the process",
	        command: "pm2 stop cozmo"
	      },
	      {
					verb: "POST",
	        action: "restart",
	        description: "Restart the process",
	        command: "pm2 restart cozmo"
	      }
	    ]
	  },
	  {
	    component: "webserver",
	    description: "Webserver for KIOSKIN",
	    actions: [
	      {
					verb: "POST",
	        action: "pid",
	        description: "Return the PID of the process if it's running",
	        command: "cat /home/pi/.pm2/pids/webserver*.pid"
	      },
	      {
					verb: "POST",
	        action: "start",
	        description: "Start the process",
	        command: "pm2 start webserver"
	      },
	      {
					verb: "POST",
	        action: "stop",
	        description: "Stop the process",
	        command: "pm2 start webserver"
	      },
	      {
					verb: "POST",
	        action: "restart",
	        description: "Restart the process",
	        command: "pm2 restart webserver"
	      }
	    ]
	  },
	  {
	    component: "sensor",
	    description: "Ultrasonic Sensor",
	    actions: [
	      {
					verb: "POST",
	        action: "pid",
	        description: "Return the PID of the process if it's running",
	        command: "cat /home/pi/.pm2/pids/ultrasonic*.pid"
	      },
	      {
					verb: "POST",
	        action: "start",
	        description: "Start the process",
	        command: "pm2 start webserver"
	      },
	      {
					verb: "POST",
	        action: "stop",
	        description: "Stop the process",
	        command: "pm2 start webserver"
	      },
	      {
					verb: "POST",
	        action: "restart",
	        description: "Restart the process",
	        command: "pm2 restart webserver"
	      }
	    ]
	  },
	  {
	    component: "oep",
	    description: "OEP",
	    actions: [
				{
					verb: "POST",
	        action: "pid",
	        description: "Return the PID of the process if it's running",
	        command: "cat /home/pi/.pm2/pids/oep*.pid"
	      },
	      {
					verb: "POST",
	        action: "start",
	        description: "Start the process",
	        command: "pm2 start oep"
	      },
	      {
					verb: "POST",
	        action: "stop",
	        description: "Stop the process",
	        command: "pm2 start oep"
	      },
	      {
					verb: "POST",
	        action: "restart",
	        description: "Restart the process",
	        command: "pm2 restart oep"
	      }
	    ]
	  }
	]
}
