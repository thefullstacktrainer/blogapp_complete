1. Create EC2 instance of free tier in AWS

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html

https://medium.com/nerd-for-tech/how-to-create-a-ubuntu-20-04-server-on-aws-ec2-elastic-cloud-computing-5b423b5bf635

chmod 400 pem file (blog_app.pem)

connect to ec2 with pem file e,g

ssh -i "blog_app.pem" ubuntu@ec2-18-212-143-125.compute-1.amazonaws.com

2. Install nginx on EC2 instance

https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-22-04

connect to EC2 instance

https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect-to-linux-instance.html

sudo apt update
sudo apt install nginx

sudo ufw app list

Dont do (sudo ufw allow 'Nginx HTTP')

systemctl status nginx


3. Clone git repo into AWS EC2

Run below commands in terminal after logging in using ssh 

pwd

/home/ubuntu

mkdir blog_app

ls 

cd blog_app

mkdir backend_code

cd backend_code

copy your git ssh key to EC2

git clone git@github.com:thefullstacktrainer/blogapp_complete.git

cd backend

