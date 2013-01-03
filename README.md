# rcs

RCS (Random Character Server) serves `/dev/urandom` over HTTPS to provide entropy for client-side CSPRNGs, avoiding collecting mouse movement from the client or other environmental variables. It keeps a stream of `/dev/urandom` open and spits out bytes when requested.

# usage

Clone this repository and run `node rcs` from the directory.

You should generate your own SSL certificate, but the `example.pfx` file will work for demonstration purposes.

You can change the port in the code. The program is so simple that it seemed foolish to add a config file.

Run `curl -k https://localhost:8000`, receive randomness
Run `curl -k https://localhost:8000/123`, receive 123 characters of randomness
Run `curl -ks https://localhost:8000/123 | wc -m`, confirm you've received 123 characters of randomness

# license

MIT
