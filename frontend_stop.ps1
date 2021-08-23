. .\frontend_config.ps1

ssh $user@$hostname "killall -9 node && pkill -u $user "
Write-Output "exit"