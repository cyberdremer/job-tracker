const isAuthorized = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({
      message: "Unauthorized access",
      status: 401,
    });
  }
};





export default isAuthorized;
