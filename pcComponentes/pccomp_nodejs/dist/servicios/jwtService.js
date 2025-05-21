"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const JWTService = {
    GenerarJWT: function (payloadJWT, vigenciaJWT, withRefresh) {
        let _tokens = [
            { tipo: 'accessToken', expiresIn: vigenciaJWT },
            { tipo: 'refreshToken', expiresIn: '5h' }
        ]
            .map(tok => {
            let _payload = tok.tipo === 'accessToken' ? Object.assign({}, payloadJWT) : { email: payloadJWT.email };
            return (0, jsonwebtoken_1.sign)(Object.assign({ tipo: tok.tipo }, _payload), process.env.JWT_SECRETKEY, { issuer: 'http://localhost:3003', expiresIn: tok.expiresIn });
        });
        return withRefresh ? _tokens : _tokens.slice(0, 1);
    },
    VerificarJWT: function (jwt) {
        // .verify() method returns decoded payload if the signature is valid and optional expiration, audience, or issuer are valid.
        // If not, it will be called with the error.
        try {
            let _resVerify = (0, jsonwebtoken_1.verify)(jwt, process.env.JWT_SECRETKEY);
            console.log('payload del jwt....', _resVerify);
            return _resVerify; //<--- paylaod del jwt con claims propios y publicos predfs como exp, iss, iat                
        }
        catch (error) {
            //token invalido ... o ha expirado(mensaje de error es: 'jwt expired') o firma erronea(mensaje de error es:'invalid token')
            console.log('token invalido....', error);
            return "";
        }
    },
    PayLoadJWT: function (jwt) {
        return (0, jsonwebtoken_1.decode)(jwt); //<--- devuelve payload aunque haya expirado, no lo verifica...en optinos puedes pasarle un objeto asi: { json:true | false, complete: true | false }
        //json: force JSON.parse on the payload even if the header doesn't contain "typ":"JWT".
        //complete: return an object with the decoded payload and header.
    }
};
exports.default = JWTService;
