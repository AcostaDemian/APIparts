function isAuthorized(opts , allowSameUser) {
   return (req, res, next) => {
       const { role, email, uid } = res.locals
       const { id } = req.params

       if (opts.allowSameUser && id && uid === id)
           return next();

       if (!role)
           return res.status(401).send({ message: 'Unauthorized' });

       if (opts.hasRole.includes(role))
           return next();

       return res.status(401).send({ message: 'Unauthorized' });
   }
}

module.exports = {
    isAuthorized,isAuthorized
};