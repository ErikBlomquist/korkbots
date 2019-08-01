# Provider
provider "aws" {
  access_key = "${var.aws_access_key}"
  secret_key = "${var.aws_secret_key}"
  region     = "${var.aws_region}"
}

# resource "aws_eip" "default" {
#   instance = "${aws_instance.korkbots-ubuntu16.id}"
#   vpc = true  
# }


# AMI - Ubuntu 16.04 (Xenial)
data "aws_ami" "ubuntu1604" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-xenial-16.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

# Security Group
resource "aws_security_group" "allow_ssh_https" {
  name        = "allow_ssh_https"
  description = "Allow SSH and HTTPS inbound to the instance"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# EC2
resource "aws_instance" "korkbots-ubuntu16" {
  ami           = "${data.aws_ami.ubuntu1604.id}"
  instance_type = "${var.aws_instance_type}"
  key_name      = "${var.aws_key_pair}"

  security_groups = ["${aws_security_group.allow_ssh_https.name}"]

  tags = {
        Name = "korkbots-webserver"
    }

  # Remote exec
  provisioner "remote-exec" {
    inline = [
      "curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -",
      "sudo apt-get update -y",
      "sudo apt-get install -y nodejs",
      "sudo apt-get install -y npm",
      "nodejs -v",
      "npm -v",
      "sudo npm install forever --global",
    ]
    
    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = "${file(var.aws_private_key_pem)}"
      host = "${self.public_ip}"
    }
  }
}