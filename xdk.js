module.exports = {
	server: 'XDK',
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
	    component: "xdk",
	    description: "XDK Controller",
	    actions: [
	      {
					verb: "POST",
	        action: "pid",
	        description: "Return the PID of the process if it's running",
	        command: "cat /home/pi/.pm2/pids/wiBoschXDKGateway*.pid"
	      },
	      {
					verb: "POST",
	        action: "restart",
	        description: "Restart the process",
	        command: "old=`ps -ef | grep wiBoschXDKGateway | grep -v grep | awk '{print $2}'`;pm2 restart wiBoschXDKGateway > /dev/null; echo \"Old PID: $old. New PID:\" `pm2 pid wiBoschXDKGateway`"
	      }
	    ]
	  }
	]
}
