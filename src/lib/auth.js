// impide que se metan a las pagina sin estar o no logeado

module.exports = {
    // para que solo se puedan ver las rutas, solo cuando este logeado
    isLoggedIn(req, res, next){
        if (req.isAuthenticated()) {
            return next();
        }
        req.session.oldUrl = req.url;
        res.redirect('/signin')
    },
    // para que solo se puedan ver las rutas, solo si no estan logeados
    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        req.session.oldUrl = req.url;
        return res. redirect('/');
    }
}