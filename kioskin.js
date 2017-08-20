module.exports = {
	server: 'KIOSKIN',
	components: [
		{
			component: "os",
	    description: "OS operations",
	    actions: [
	      {
	        action: "reboot",
	        description: "Reboot",
	        command: "sudo shutdown -r now"
	      },
	      {
	        action: "shutdown",
	        description: "Shutdown",
	        command: "sudo shutdown now"
	      },
	      {
	        action: "ip",
	        description: "Get local IP",
	        command: "hostname -I"
	      }
	    ]
		},
	  {
	    component: "cozmo",
	    description: "Cozmo controller in Python",
	    actions: [
	      {
	        action: "pid",
	        description: "Return the PID of the process if it's running",
					command: "cat /home/pi/.pm2/pids/cozmo*.pid"
	      },
	      {
	        action: "start",
	        description: "Start the process",
	        command: "pm2 start cozmo"
	      },
	      {
	        action: "stop",
	        description: "Stop the process",
	        command: "pm2 stop cozmo"
	      },
	      {
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
	        action: "pid",
	        description: "Return the PID of the process if it's running",
	        command: "cat /home/pi/.pm2/pids/webserver*.pid"
	      },
	      {
	        action: "start",
	        description: "Start the process",
	        command: "pm2 start webserver"
	      },
	      {
	        action: "stop",
	        description: "Stop the process",
	        command: "pm2 start webserver"
	      },
	      {
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
	        action: "pid",
	        description: "Return the PID of the process if it's running",
	        command: "cat /home/pi/.pm2/pids/ultrasonic*.pid"
	      },
	      {
	        action: "start",
	        description: "Start the process",
	        command: "pm2 start webserver"
	      },
	      {
	        action: "stop",
	        description: "Stop the process",
	        command: "pm2 start webserver"
	      },
	      {
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
	        action: "pid",
	        description: "Return the PID of the process if it's running",
	        command: "cat /home/pi/.pm2/pids/oep*.pid"
	      },
	      {
	        action: "start",
	        description: "Start the process",
	        command: "pm2 start oep"
	      },
	      {
	        action: "stop",
	        description: "Stop the process",
	        command: "pm2 start oep"
	      },
	      {
	        action: "restart",
	        description: "Restart the process",
	        command: "pm2 restart oep"
	      }
	    ]
	  }
	]
}
