# SMSBook

Easy social network like facebook without Internet

Only tested on Android with Samsung S7 edge Android 8.0

# Setup

## Use Npm
```Bash
$ npm install
```

## Use Yarn
```Bash
$ yarn install
```

# Run Android

## React-Native

```bash
$ react-native run-android
```

## Npm

```bash
$ npm run android
```

## Yarn

```bash
$ yarn android
```

# Flow


<table>
<!-- <Flowchart> -->
<tr><td colspan=2 align="center">
    <b>Flow</b></br>
    [<a href="http://mermaid-js.github.io/mermaid/#/flowchart">docs</a> - <a href="https://mermaidjs.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggVERcbiAgICBBW0hhcmRdIC0tPnxUZXh0fCBCKFJvdW5kKVxuICAgIEIgLS0-IEN7RGVjaXNpb259XG4gICAgQyAtLT58T25lfCBEW1Jlc3VsdCAxXVxuICAgIEMgLS0-fFR3b3wgRVtSZXN1bHQgMl0iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ">live editor</a>]
</td></tr>
<tr>
    <pre>
graph TD
    A[Sender] -->|Send Group Message by SMS| B(Phone as SMS Server)
    B --> K{Does it have Internet?}
    K -->|Yes! Send by Internet| C(Twilio:Internet SMS service to reduce cost)
    C -->|Send by Internet| G[Laptop]
    C -->|Send by Internet| H[iPhone with Internet]
    C -->|Send by Internet| I[Android with Internet]
    C -->|Send by Internet| L[APIs]
    K -->|No! Send by SMS| E[iPhone]
    K -->|No! Send by SMS| F[Android]
    K -->|No! Send by SMS| J[Traditional Phone]
    </pre>
    <img src="https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggVERcbiAgICBBW1NlbmRlcl0gLS0-fFNlbmQgR3JvdXAgTWVzc2FnZSBieSBTTVN8IEIoUGhvbmUgYXMgU01TIFNlcnZlcilcbiAgICBCIC0tPiBLe0RvZXMgaXQgaGF2ZSBJbnRlcm5ldD99XG4gICAgSyAtLT58WWVzISBTZW5kIGJ5IEludGVybmV0fCBDKFR3aWxpbzpJbnRlcm5ldCBTTVMgc2VydmljZSB0byByZWR1Y2UgY29zdClcbiAgICBDIC0tPnxTZW5kIGJ5IEludGVybmV0fCBHW0xhcHRvcF1cbiAgICBDIC0tPnxTZW5kIGJ5IEludGVybmV0fCBIW2lQaG9uZSB3aXRoIEludGVybmV0XVxuICAgIEMgLS0-fFNlbmQgYnkgSW50ZXJuZXR8IElbQW5kcm9pZCB3aXRoIEludGVybmV0XVxuICAgIEMgLS0-fFNlbmQgYnkgSW50ZXJuZXR8IExbQVBJc11cbiAgICBLIC0tPnxObyEgU2VuZCBieSBTTVN8IEVbaVBob25lXVxuICAgIEsgLS0-fE5vISBTZW5kIGJ5IFNNU3wgRltBbmRyb2lkXVxuICAgIEsgLS0-fE5vISBTZW5kIGJ5IFNNU3wgSltUcmFkaXRpb25hbCBQaG9uZV0iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlfQ" />
</tr>
<!-- </Flowchart> -->
</table>


# Check real device on Android

## How to check android with physical devices?
```Bash
adb devices
```

The "List of devices attached" should have "device" in the list


# Todo

- [x] Read SMS
- [x] Send SMS
- [ ] Twilio SMS Send
- [ ] Read incoming message by clock