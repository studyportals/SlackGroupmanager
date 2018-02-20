const express = require('express');
const Axios = require('axios-es6');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

    let getUserGroups = Axios.get('https://slack.com/api/usergroups.list');
    let getUsers = Axios.get('https://slack.com/api/users.list');

    Promise.all([getUserGroups, getUsers])
	    .then(
	    	response => {

			    let [userGroups, users] = response;

			    let members = users.data.members.filter(
			    	m => !m.is_bot && !m.is_app_user && !m.deleted && m.has_2fa
			    ).sort(
			    	(a, b) => a.profile.real_name.localeCompare(b.profile.real_name)
			    );

				res.render('index', {
					title: 'Express',
					groups:  userGroups.data.usergroups,
					users: members
				});
		   }
	   )

	    .catch(
	    	err => {
	    		console.log('err', err);
		    }
	    )
});

module.exports = router;
