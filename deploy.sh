echo create tmp path
git add . 
git commit -m 'deployntd'
git push origin master
ssh -p20200 root@ntdsoft.net "cd /portaisntd/servidorAlunoApp && ls && pm2 restart servidorAlunoApp.js && pm2 logs servidorAlunoApp"






