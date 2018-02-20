const express = require('express');
const Axios = require('axios-es6');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {

  Axios.get(
      'https://slack.com/api/usergroups.users.list',
      {
          params: {
              usergroup: req.query.gi,
              include_disabled: false
          }
      }
  ).then(
      response => {

          res.send(response.data.users);
      }
  ).catch(
      err => console.log('err', err)
  );
});

router.post('/', function(req, res) {

	Axios.post(
		'https://slack.com/api/usergroups.users.update',
        {
            "usergroup": req.body.usergroup,
            "users": req.body.users
        }
	).then(
        () => {

			res.send('success');
		}
	).catch(
		err => console.log('err', err)
	);
});

module.exports = router;
