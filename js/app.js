(function (angular) {
	'use strict';
	var app = angular.module('todosApp', []);
	app.controller('todosController', ['$scope','$location', function ($scope,$location) {
		console.log($location.url())  ;
		//angular内置有$location参数
		//使用该参数的方法 $location.url()可以得到url中锚点值#后面的部分
		//angular 内置的$scope.$watch(参数一，参数二函数) 可以监视数据模型的变化
		//参数二函数：funcation(now,old){} now--变化后新的值 old--变化后旧的值
		//参数一：数据模型对应的名字 参数二：相应的数据发生变化就会调用这个函数
	
		$scope.todos = [{
				id: 1,
				name: 'eating',
				completed: true
			},
			{
				id: 2,
				name: 'shopping',
				completed: false
			},
			{
				id: 3,
				name: 'sleeping',
				completed: true
			}
		]
		$scope.newTodo='';
		//-------------------添加任务--------------
	$scope.add=function(){
		if(!$scope.newTodo){
			//判断newTodo是否为空，为空的话，就不执行添加新的任务
		return;
	}
		$scope.todos.push({
			id:Math.random(),
			name:$scope.newTodo,
			completed:false
		})
		$scope.newTodo='';
	}
	//---------------------删除任务-------------------
	$scope.remove=function(id){
		//根据id去数组中去查找对应的元素并删除
		for(var i=0;i<$scope.todos.length;i++){
		var item=$scope.todos[i];
		if(item.id==id){//如果需要删除的元素的id 等于当前遍历的id，则删除
			$scope.todos.splice(i,1);//数组中删除当前元素的方法  从当前第i条开始删除，删除一条
			//删除当前的元素
			return;
		}
		}
	}
	//--------------------修改任务的内容----------------------
	$scope.isEditingId=-1;//让其默认值等于-1，因为页面默认没有处于可编辑的状态
	//因为isEditingId是根据元素的唯一标志id来时实现选择元素进行可编辑的
	$scope.edit=function(id){
		$scope.isEditingId=id;
	}
//---------------------修改完成任务的内容后，点击回车保存修改--------------------
	$scope.save=function(){
		$scope.isEditingId=-1;
		//只是改变了当前的文本框的状态，让其不可以进行编辑
	}
//-------------------修改任务的状态--详细见html页面------------------------------------

//---------------------------批量切换任务的状态---------------------------
$scope.selectAll=false;
$scope.toggleAll=function(){
//让$scope.todos中所有数据的 completed 的值都等于$scope.selectAll
for (var i = 0; i < $scope.todos.length; i++) {
	var item = $scope.todos[i];
	item.completed=$scope.selectAll;
	
}
}
//----------------------显示没有完成的任务数-------------------------
$scope.getActive=function(){
	//遍历	$scope.todos并获取其中completed:false的数量
	var count=0;
	for( var i=0;i<$scope.todos.length;i++){
var item=$scope.todos[i];
if(!item.completed){
count++;
}
	}
return count;



}
//-----------------------清除已经完成的任务-------------------------
$scope.clearAll=function(){
//遍历$scope.todos，如果当前元素的 completed:true，就把其删除
for( var i=$scope.todos.length-1;i>=0;i--){
	//移除当前的一个元素
/**注意的问题：
 * 当遍历数组并且删除元素时，数组的长度在改变，删除一个元素，数组的长度就会减少一，
 * 解决的方法是：逆向思维，从后往前进行遍历
 * i--时，从后往前进行判断并删除，而数组中前边的还没遍历过的元素的索引没有发生改变，
 * 等再次遍历时仍然可以从后开始往前进行删除所以完成了删除
 */
	var item=$scope.todos[i];
	if(item.completed){
$scope.todos.splice(i,1);
	}
}
}
//-----切换显示不同状态的任务-----------------方法一------使用过滤器filter-----------------
// $scope.isCompleted={};//filter过滤器的过滤条件,显示所有时，该对象为空，匹配所有的条件
// $scope.active=function(){
// 	$scope.isCompleted={completed:false};//未完成的任务
// }
// $scope.completed=function(){
// 	$scope.isCompleted={completed:true};//已经完成的任务
// }
// $scope.all=function(){
// 	$scope.isCompleted={};//显示所有的任务，（完成以及未完成）
// }
//------------------方法二--------利用 $scope.$watch()方法来监视锚点的变化--------------------------
$scope.loca=$location;
$scope.$watch('loca.url()',function(now,old){
	//angular内置有$location参数
		//使用该参数的方法 $location.url()可以得到url中锚点值#后面的部分
		//angular 内置的$scope.$watch(参数一，参数二函数) 可以监视数据模型的变化
		//参数二函数：funcation(now,old){} now--变化后新的值 old--变化后旧的值
		//参数一：数据模型对应的名字 参数二：相应的数据发生变化就会调用这个函数
	switch (now) {
		case '/active':
			$scope.isCompleted={completed:false};
			break;
		case '/completed':
			$scope.isCompleted={completed:true};
			break;
		default:
			$scope.isCompleted={};
			break;
	}
})
//---------------切换时，不同焦点的状态--------------------------


	}])
})(angular);
