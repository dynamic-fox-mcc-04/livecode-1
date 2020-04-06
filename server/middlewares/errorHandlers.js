
module.exports = (err, req, res, next) => {
    if (err) {
        switch (err.name) {
            case value:

                break;

            default:
                res.status(500).json({
                    err
                })
                break;
        }
    }
}