const jwt = require('jsonwebtoken');
const logger = require('fancy-log');
const bcrypt = require('bcrypt');
require('dotenv').config();

const { validateSignin, validateSignup } = require('./../modal/validateData')
const User = require('./../modal/user');

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const blacklistedTokens = [];

async function isTokenIsBlacklisted({ token }) {
  const isTokenPresent = blacklistedTokens.filter(blacklistedToken => blacklistedToken === token);
  if (isTokenPresent.length > 0) {
    return {
      status: false,
      message: 'Invalid Token'
    }
  } else {
    return {
      status: true
    }
  }
}

async function addNewUser({ userData }) {
  try {
    const saltedPwd = await bcrypt.hash(userData.password, SALT_ROUNDS);
    if (!saltedPwd) {
      return {
        status: false,
        data: 'Unable to create new user. Try again'
      }
    }
    const newUser = new User({
      username: userData.username,
      password: saltedPwd,
      courses: [{
        coursename: userData.coursename,
        startDate: userData.startDate,
        endDate: userData.endDate
      }]
    })
    const savedUser = await newUser.save();
    const token = await jwt.sign({ username: userData.username, id: savedUser._id }, JWT_SECRET);
    logger('User got signup :: user id :: ', savedUser._id)
    return {
      status: true,
      data: savedUser,
      token,
      message: 'New user got created'
    }
  } catch(error) {
    logger('error :: ', error);
    return {
      status: false,
      message: error.message
    }
  }
}

async function updateExistingUser({ user, userData }) {
  try {
    const savedUser = await User.updateOne({ _id: user._id }, {
      $set: {
        "courses": [...user.courses, { name: userData.coursename, startDate: userData.startDate, endDate: userData.endDate }]
      }
    })

    const token = await jwt.sign({ username: userData.username, id: savedUser._id }, JWT_SECRET);
    return {
      status: true,
      data: { username: userData.username, courses: [...user.courses, { name: userData.coursename, startDate: userData.startDate, endDate: userData.endDate }] },
      token,
      message: 'Existing user courses updated'
    }
  } catch (error) {
    return {
      status: false,
      message: error.message
    }
  }

}

async function checkUserPassword({ userData, user }) {
  try {
    const isMatched = await bcrypt.compare(userData.password, user.password);
    if (isMatched) {
      return {
        status: true
      }
    } else {
      return {
        status: false,
        message: "Email or Password is wrong"
      }
    }
  } catch (error) {
    logger('error :: ', error);
    return {
      status: false,
      message: error.message
    }
  }
}

async function validateUserToken({ token }) {
  const response = await isTokenIsBlacklisted({ token })
  if (!response.status) {
    return response
  }

  if (token === undefined) {
    return {
      status: false,
      message: 'Not a valid user.'
    }
  }

  try {
    const decodedToken = await jwt.verify(token, JWT_SECRET);
    return {
      status: true,
      token: decodedToken
    };
  } catch (error) {
    logger('validateUserToken :: error :: ', error);
    return {
      status: false,
      message: error.message
    }
  }
}

exports.postSignup = async (req, res, next) => {
  const data = {
    ...req.body,
    endDate: new Date(req.body.endDate),
    startDate: new Date(req.body.startDate)
  }
  const { error, value } = await validateSignup(data);
  if (error) {
    console.log('postSignup :: error :: ', error);
    return res.status(200).json({
      status: false,
      data: error
    })
  }

  const userPresent = await User.findOne({ username: req.body.username })
  if (userPresent) {
    let response = await checkUserPassword({ userData: req.body, user: userPresent })
    if (!response.status) {
      return res.status(200).json({
        ...response
      })
    }
    response = await updateExistingUser({ userData: data, user: userPresent })
    if (!response.status) {
      return res.status(200).json({
        ...response
      })
    } else {
      return res.status(201).json({
        ...response
      })
    }

  } else {
    const response = await addNewUser({ res, userData: data })
    if (!response.status) {
      return res.status(200).json({
        ...response
      })
    } else {
      return res.status(201).json({
        ...response
      })
    }
  }
}

exports.postSignin = async (req, res, next) => {
  const { error, value } = await validateSignin(req.body);
  if (error) {
    logger('postSignin :: error :: ', error);
    return res.status(200).json({
      status: false,
      message: error.message
    })
  }

  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(200).json({
      message: "User doesnt exists with specfied username",
      status: false
    });
  }
  const response = await checkUserPassword({ userData: req.body, user })
  if (!response.status) {
    return res.status(200).json(response)
  }

  const token = await jwt.sign({
    username: user.username,
    id: user._id,
  }, JWT_SECRET);

  await res.setHeader("x-access-token", `${token}`)
  logger('User got signin :: user id :: ', user._id)

  return res.status(200).json({
    status: true,
    data: user,
    token,
  });

}

exports.getLogout = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token === undefined) {
    return res.status(200).json({
      status: false,
      message: 'Not a valid user.'
    })
  }
  blacklistedTokens.push(token);
  logger('User logged out')
  return res.status(200).json({
    status: true,
    message: 'Logged out successfully'
  });
}

exports.getUserDetails = async (req, res, next) => {
  const utoken = req.headers['x-access-token'];
  const validTokenRes = await validateUserToken({ token: utoken, res })
  if (!validTokenRes.status) {
    return res.status(200).json(validTokenRes)
  }

  try {
    const username = validTokenRes.token.username;
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(200).json({
        message: "User doesnt exists with specified data",
        status: false
      });
    }
    await res.setHeader("x-access-token", `${utoken}`)

    return res.status(200).json({
      status: true,
      data: user
    });
  } catch (error) {
    logger('postGetUserDetails :: error :: ', error.message)
    return res.status(200).json({
      status: false,
      message: 'Not a valid user.'
    })
  }
}