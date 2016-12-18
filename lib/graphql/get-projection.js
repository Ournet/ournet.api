'use strict';

module.exports = function getProjection(ast) {
	return ast.selectionSet.selections.map(selection => selection.name.value);
};
