function authWithCredentials (username, password, callback) {
    this.username = username;
    this.password = password;

    Authenticator.getAuth(username, password).then(session => {
        callback(session);
    }).catch((err) => {
        callback(null)
        console.error(err);
    });
}

function authWithToken (session, callback) {
    Authenticator.validate(session.accessToken, session.clientToken).then((isValid) => {
        callback(isValid);
    });
}

function invalidate (session) {
    Authenticator.invalidate(session.accessToken, session.clientToken);
}