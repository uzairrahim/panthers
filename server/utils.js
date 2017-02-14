module.exports = {
	getTeamID : function(){
		return 34;
	},
	getRootResponse : function(){
		return {
			status : 200
		}
	},
	getErrorResponse : function(code){
		return {
			status : 503,
			error : code
		}
	},
	getSuccessResponse : function(rows){
		return {
			status : 200,
			json : rows
		}
	}
}