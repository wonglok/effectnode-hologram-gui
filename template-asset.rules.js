{
  /* Visit https://firebase.google.com/docs/database/security to learn more about security rules. */
  "rules": {

    "admin": {
      //
    },

    //
    "folder": {
      "$folderID": {
        ".read": "root.child('folder').child($folderID).child('owner').hasChild(auth.uid)",
        ".write": "!root.child('folder').child($folderID).hasChildren() || root.child('folder').child($folderID).child('owner').child(auth.uid).exists()",

      	//
        ".validate": "newData.child('owner').hasChild(auth.uid) && newData.child('rw').hasChild(auth.uid)",

        //
        "owner": {},
				"rw": {
          "$uid": {}
        },
      },
    },

    //
    "details": {
      "folder": {
      	"$folderID": {
          ".read": "root.child('folder').child($folderID).child('rw').hasChild(auth.uid)",
          ".write": "root.child('folder').child($folderID).child('rw').hasChild(auth.uid)",


          ".validate": "root.child('details').child('folder').hasChild($folderID) || !newData.hasChild('parentID')"

        }
    	},
    },

  	//
    // cache
    "discovery-cache": {
      "$uid": {
        "folders": {
          "$folderID": {

          }
        }
      }
    }

    //
	}
}

//