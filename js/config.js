var tbConfig = angular.module('taskboardApp.config', []);

var config_data = {

  'GENERAL_CONFIG': {

  	// Outlook Task folders
    // Name: Name of the task folder
    // Title: Task lane title
    // Limit: hard limits for each task lane. 0 = no limit
    // Sort: Sort order for tasks (default = priority)
    // Restrict: Restrict certain tasks (default = only show incomplete tasks) (More info = https://msdn.microsoft.com/en-us/library/office/ff869597.aspx)
    // Owner: If the task folder is shared by someone else, enter the name of the owner. (i.e. Evren Varol)
    'BACKLOG_FOLDER':       { Name: '', Title: 'BACKLOG', Limit: 0, Sort: "[Ordinal]", Restrict: "[Complete] = false", Owner: '' },
    'INPROGRESS_FOLDER': 	{ Name: 'InProgress', Title: 'IN PROGRESS', Limit: 5, Sort: "[Importance]", Restrict: "[Complete] = false", Owner: ''},
    'NEXT_FOLDER': 			{ Name: 'Next', Title: 'NEXT', Limit: 0, Sort: "[DueDate][Importance]", Restrict: "[Complete] = false", Owner: ''},
    'WAITING_FOLDER': 		{ Name: 'Waiting', Title: 'WAITING', Limit: 0, Sort: "[Importance]", Restrict: "[Complete] = false", Owner: '' },
    'COMPLETED_FOLDER':     { Name: 'Completed', Title: 'COMPLETED', Limit: 0, Sort: "[Importance]", Restrict: "[Complete] = false", Owner: '' },

    // Task Note Excerpt Size
    // number of chars for each task note
    // 0 = makes no notes appear on the each task card
    'TASKNOTE_EXCERPT':		200,

    // Default task template
    'TASK_TEMPLATE':        ''

  }
};

angular.forEach(config_data,function(key,value) {
		tbConfig.constant(value,key);
});

