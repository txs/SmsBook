let singleMessage = {}
var text = '!pcs@txs'
let old = text

if (text.includes('@')) {
    if (text.includes('#')) {
        let hashsplit = text.split('#')
        text = hashsplit[0]
        hashsplit.shift()
        singleMessage.hashs = hashsplit
    }
    let txtSplit = text.split('@')
    singleMessage.touserid = txtSplit[1]
    text = txtSplit[0]
}
if (text.includes('!')) {
    if (text.includes('#')) {
        let hashsplit = text.split('#')
        text = hashsplit[0]
        hashsplit.shift()
        singleMessage.hashs = hashsplit
    }
    let txtSplit = text.split('!')
    singleMessage.groupid = txtSplit[1]
    text = txtSplit[0]
}
if (text != "") {
    if (text.includes('#')) {
        let hashsplit = text.split('#')
        text = hashsplit[0]
    }
    singleMessage.touserid = text
}
// console.log(singleMessage);
// console.log(text == "");

var item = singleMessage
let codeName = ""
let hasGroup = false
if ('groupid' in item) {
    codeName += "!"
    codeName += item.groupid
    hasGroup = true
}
if ('touserid' in item) {
    if (!!hasGroup) codeName += '@'
    codeName += item.touserid
}
if ('hashs' in item) {
    item.hashs.map(hash => {
        codeName += '#'
        codeName += hash
    })
}
console.log(codeName);
console.log(codeName == old);





//parser test
let item = { groupid: ['txs', 'txt'] }
if ('groupid' in item) {
    console.log(item.groupid)
}
if ('touserid' in item) {
    console.log(item.touserid)
}