function dateFormat(date) {
    options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      }
    return date.toLocaleString("id-ID", options)
}

module.exports = dateFormat