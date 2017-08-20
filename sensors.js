module.exports = {
	server: 'SENSORS',
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
	    component: "wrapper",
	    description: "IoTCS Wrapper",
	    actions: [
	      {
	        action: "pid",
	        description: "Return the PID of the process if it's running",
					command: "cat /home/pi/.pm2/pids/hackathonwrapper*.pid"
	      },
	      {
	        action: "start",
	        description: "Start the process",
	        command: "pm2 start hackathonwrapper"
	      },
	      {
	        action: "stop",
	        description: "Stop the process",
	        command: "pm2 stop hackathonwrapper"
	      },
	      {
	        action: "restart",
	        description: "Restart the process",
	        command: "pm2 restart hackathonwrapper"
	      }
	    ]
	  }
	]
}
