const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/users.controller");
const ridersController = require("../controllers/riders.controller");
const commentsController = require("../controllers/comments.controller");
const likesController = require("../controllers/like.controller");
const authMiddleware = require("../middlewares/auth.middlewares");

const { multer, multerConfig } = require("../config/storage.config");
const passport = require('passport');

const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
];

router.get("/", (req, res, next) => {
  res.render("home");
});

// auth
router.get("/login", authMiddleware.isNotAuthenticated, authController.login);
router.post("/login", authMiddleware.isNotAuthenticated, authController.doLogin);
router.get("/register", authMiddleware.isNotAuthenticated, authController.register);
router.post("/register", authMiddleware.isNotAuthenticated, authController.doRegister);
router.get("/logout", authMiddleware.isAuthenticated, authController.logout);
router.get("/activate/:token", authController.activate);

// Google auth
router.get('/auth/google', authMiddleware.isNotAuthenticated, passport.authenticate('google-auth', { scope: GOOGLE_SCOPES }));
router.get('/auth/google/callback', authMiddleware.isNotAuthenticated, authController.doLoginGoogle)

// users
router.get("/profile", authMiddleware.isAuthenticated, usersController.profile);

// riders
router.get("/riders", ridersController.list);

router.get('/riders/create', ridersController.create);

router.post("/riders/create", multerConfig.fields([{ name: 'image', maxCount: 1}, { name: 'gallery', maxCount: 5 }]), ridersController.doCreate);


// Otras rutas...
router.get("/riders/:id", /*authMiddleware.isAuthenticated,*/ ridersController.details);
router.get("/riders/:id/delete", /*authMiddleware.isAuthenticated,*/ ridersController.delete);
router.get("/riders/:id/update", /*authMiddleware.isAuthenticated,*/ ridersController.update);
/*router.post("/riders/:id/update", /*authMiddleware.isAuthenticated, multer.single('image'), ridersController.doUpdate);*/
//ruta para la galeria //
router.get('/riders/:id/gallery',ridersController.gallery);
// comments
router.get("/comments/:id/delete", /*authMiddleware.isAuthenticated,*/ commentsController.delete);
router.post("/comments/:id/create", /*authMiddleware.isAuthenticated,*/ commentsController.doCreate);

// likes
router.post("/user/:riderId/like", likesController.doCreate)

//riders/:id/favourite - la ruta

module.exports = router;
