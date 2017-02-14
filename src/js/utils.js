export function getTeamID(){
	return 34;
}

export function getTeamNameByID(teams, id){
	if(teams && teams.json && teams.json.length){
		let t = teams.json;
		for(let i = 0; i < t.length; i++){
			if(t[i].id == id){
				return t[i].name;
			}
		}
	}
}

export function getGroundNameByID(grounds, id){
	if(grounds && grounds.json && grounds.json.length){
		let g = grounds.json;
		for(let i = 0; i < g.length; i++){
			if(g[i].id == id){
				return g[i].name;
			}
		}
	}
}

export function navigate(url){
	window.location.assign(url);
}

export function getOrdinal(n){
    let s = ['th','st','nd','rd'];
    let v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function getBattingTableHeadColumns() {
	return [
		{label : '',		classnames : 'name'		},
		{label : 'Inns',	classnames : 'no-phone'	},
		{label : 'NOs',		classnames : 'no-phone'	},
		{label : 'Runs', 	classnames : ''			},
		{label : 'Balls',	classnames : 'no-phone'	},
		{label : 'Avg',		classnames : 'no-phone'	},
		{label : 'Hs',		classnames : ''			},
		{label : '100s',	classnames : 'no-phone'	},
		{label : '50s',		classnames : 'no-phone'	},
		{label : 'SR',		classnames : 'no-phone'	},
		{label : '6s',		classnames : 'no-phone'	},
		{label : '4s',		classnames : 'no-phone'	}
	];
}

export function getBowlingTableHeadColumns() {
	return [
		{label : '',		classnames : 'name'		},
		{label : 'Overs',	classnames : 'no-phone'	},
		{label : 'Mdns',	classnames : 'no-phone'	},
		{label : 'Runs',	classnames : 'no-phone'	},
		{label : 'Wkts',	classnames : ''			},
		{label : 'Avg',		classnames : ''			},
		{label : 'Eco',		classnames : 'no-phone'	},
		{label : 'Wides',	classnames : 'no-phone'	},
		{label : 'NBs',		classnames : 'no-phone'	}
	];
}

export function getProfileImageURL(name) {
	return 'http://www.centraltxcricket.org/uploadphotos/players/' + name;
}

export function getSeasonsList(seasons) {
	let s = ['All Time', 'Current Year'];
	if(seasons && seasons.json && seasons.json.length){
		for(let i = 0; i < seasons.json.length; i++){
			let _s = seasons.json[i];
			if(_s.year !== null){
				s.push(_s.year + ' - ' + _s.league_name);
			}
		}
	}

	return s;
}

export function getSeasonID(seasons, index) {
	if(index == 0){ return -2 }
	if(index == 1){ return -1 }
	if(index > 1){ let i = index - 2; return seasons.json[i].season_id; }
}

export function sortRosterByName(team) {
	let roster = team.sort(function(a,b){
		if(a.first_name == b.first_name) return a.last_name > b.last_name ? 1 : -1;
		return a.first_name > b.first_name ? 1 : -1;
	});

	return roster;
}