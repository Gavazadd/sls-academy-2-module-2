function ipToInt(ipAddress)  {
    const parts = ipAddress.split('.');
    return (parseInt(parts[0]) << 24)
        + (parseInt(parts[1]) << 16)
        + (parseInt(parts[2]) << 8)
        + parseInt(parts[3]);
}

module.exports = {ipToInt}