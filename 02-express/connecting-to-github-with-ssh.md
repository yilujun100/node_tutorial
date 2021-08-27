## 用SSH连接github(Connecting to Github with SSH)

参考链接：https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh

### 关于SSH

使用SSH协议，可以连接和验证远程服务器和服务。利用SSH密钥可以连接Github,而无需在每次访问时都提供用户名和个人访问令牌。

### 检查现有SSH密钥

在生成SSH密钥之前，检查是否存在以`.pub`结尾的文件

```bash
ls -al ~/.ssh
```

检查目录列表查看是否已经有SSH公钥。默认情况下，公钥的文件名是以下之一：

* id_rsa.pub
* id_ecdsa.pub
* id_ed25519.pub

如果没有现有的公钥和密钥对，或者不想使用任何可用于连接到 Github 的密钥对，则生成新的SSH密钥。

### 生成新SSH key并添加到ssh-agent(Mac端)

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

1.`your_email@example.com`替换为自己的Github邮箱地址

2.后面一直回车

```bash
Generating public/private rsa key pair.
Enter a file in which to save the key (/home/you/.ssh/id_rsa): [Press enter]
Enter passphrase (empty for no passphrase): [Type a passphrase]
Enter same passphrase again: [Type passphrase again]
```

将SSH密钥添加到ssh-agend

```bash
eval "$(ssh-agent -s)"
> Agend pid 21305
ssh-add /Users/yilujun/.ssh/id_rsa
```

### 将SSH key 加入到 Github 账户中

Settings > SSH and GPG keys > New SSH key

```bash
# copy your public SSH key
cat ~/.ssh/id_rsa.pub
```

在 "Title"（标题）字段中，为新密钥添加描述性标签。例如，如果使用的是个人Mac,此密钥名称可能是"Yilujun laptop"

将密钥粘贴到"Key"（密钥）字段

单击 Add SSH key (添加SSH密钥)

如有提示，请确认Github密码

### 测试SSH连接

```bash
ssh git@github.com
```

```bash
Hi username! You've successfully authenticated, but GitHub does not
provide shell access.
```

如果看到`successfully`，表示连接成功