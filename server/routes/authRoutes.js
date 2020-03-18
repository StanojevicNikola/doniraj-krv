const passport = require("passport");

module.exports = app => {
    app.get(
        "/auth/google",
        passport.authenticate("google", { scope: ["profile", "email"] })
    );

    app.get(
        "/auth/google/callback",
        passport.authenticate("google", { failureRedirect: "/login" })
    );

    app.get("/api/logout", (req, res) => {
        req.logout();
        res.send(req.user);
    });

    app.get("/api/current_user", (req, res) => {
        res.send(req.user);
    });

    app.get("/auth/facebook", passport.authenticate("facebook"));

    app.get(
        "/auth/facebook/callback",
        passport.authenticate("facebook", { failureRedirect: "/login" }),
        (req, res) => {
            res.redirect("/");
        }
    );
};
