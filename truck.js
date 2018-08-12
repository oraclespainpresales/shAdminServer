module.exports = {
	server: 'TRUCK',
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
	      },
				{
					verb: "POST",
	        action: "restartbletooth",
	        description: "Restart bluetooth service",
	        command: "sudo systemctl restart bluetooth"
	      }
	    ]
		},
	  {
	    component: "truck",
	    description: "Truck Controller",
	    actions: [
	      {
					verb: "POST",
	        action: "pid",
	        description: "Return the PID of the process if it's running",
	        command: "cat /home/pi/.pm2/pids/ wiInfraredDistanceInterruptHandler*.pid"
	      },
	      {
					verb: "POST",
	        action: "start",
	        description: "Start the process",
	        command: "pm2 start wiInfraredDistanceInterruptHandler"
	      },
	      {
					verb: "POST",
	        action: "stop",
	        description: "Stop the process",
	        command: "pm2 stop wiInfraredDistanceInterruptHandler"
	      },
	      {
					verb: "POST",
	        action: "restart",
	        description: "Restart the process",
	        command: "pm2 restart wiInfraredDistanceInterruptHandler"
	      }
	    ]
	  },
		{
	    component: "Brother",
	    description: "Brother Printer Controller",
	    actions: [
	      {
					verb: "POST",
	        action: "pid",
	        description: "Return the PID of the process if it's running",
	        command: "cat /home/pi/.pm2/pids/ brother*.pid"
	      },
	      {
					verb: "POST",
	        action: "start",
	        description: "Start the process",
	        command: "pm2 start brother"
	      },
	      {
					verb: "POST",
	        action: "stop",
	        description: "Stop the process",
	        command: "pm2 stop brother"
	      },
	      {
					verb: "POST",
	        action: "restart",
	        description: "Restart the process",
	        command: "pm2 restart brother"
	      }
	    ]
	  },
	]
}
