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
					verb: "POST",
	        action: "restartbluetooth",
	        description: "Restart bluetooth service",
	        command: "old=`ps -ef | grep bluetoothd | grep -v grep | awk '{print $2}'`;sudo systemctl restart bluetooth;echo \"Old PID:$old. New PID: \"`ps -ef | grep bluetoothd | grep -v grep | awk '{print $2}'`"
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
	        command: "cat /home/pi/.pm2/pids/wiTruckHandler*.pid"
	      },
	      {
					verb: "POST",
	        action: "start",
	        description: "Start the process",
	        command: "pm2 start wiTruckHandler"
	      },
	      {
					verb: "POST",
	        action: "stop",
	        description: "Stop the process",
	        command: "pm2 stop wiTruckHandler"
	      },
	      {
					verb: "POST",
	        action: "restart",
	        description: "Restart the process",
	        command: "old=`ps -ef | grep wiTruckHandler | grep -v grep | awk '{print $2}'`;pm2 restart wiTruckHandler > /dev/null; echo \"Old PID: $old. New PID:\" `pm2 pid wiTruckHandler`"
	      }
	    ]
	  },
	  {
	    component: "sensors",
	    description: "Sensors Controller",
	    actions: [
	      {
					verb: "POST",
	        action: "pid",
	        description: "Return the PID of the process if it's running",
	        command: "cat /home/pi/.pm2/pids/wiInfraredDistanceInterruptHandler*.pid"
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
	        command: "old=`ps -ef | grep wiInfraredDistanceInterruptHandler | grep -v grep | awk '{print $2}'`;pm2 restart wiInfraredDistanceInterruptHandler > /dev/null; echo \"Old PID: $old. New PID:\" `pm2 pid wiInfraredDistanceInterruptHandler`"
	      }
	    ]
	  },
		{
	    component: "brother",
	    description: "Brother Printer Controller",
	    actions: [
	      {
					verb: "POST",
	        action: "pid",
	        description: "Return the PID of the process if it's running",
	        command: "cat /home/pi/.pm2/pids/brother*.pid"
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
					command: "old=`ps -ef | grep startRest | grep -v grep | awk '{print $2}'`;pm2 restart brother > /dev/null; echo \"Old PID: $old. New PID:\" `pm2 pid brother`"
	      },
				{
					verb: "POST",
	        action: "test",
	        description: "Print a test",
					command: "curl -s -X POST -d '{\"dataFormat\":\".png\",\"ImageURL\":\"http://infra.digitalpracticespain.com:8080/media/WEDO_teamBW.png\",\"ProductId\":\"NA4JHHJJ3GR\"}' http://localhost:8080/print/"
	      }
	    ]
	  },
	]
}
