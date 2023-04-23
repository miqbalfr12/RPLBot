const firebase = require('../db/firebaseConfig');

const getDestinasi = (callback) => {
    firebase.ref('destinasi').once(
        'value',
        (snapshot) => {
            callback(snapshot.val())
        },
        (err) => {
            console.log('read filed: ', err.name)
        }
    )
}

const getKuliner = (callback) => {
    firebase.ref('kuliner').once(
        'value',
        (snapshot) => {
            callback(snapshot.val())
        },
        (err) => {
            console.log('read filed: ', err.name)
        }
    )
}

module.exports = {getDestinasi, getKuliner}