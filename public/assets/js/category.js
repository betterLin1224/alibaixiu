// 当添加分类表单发生提交行为的时候
$('#addCategory').on('submit', function() {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    // 向服务端发送请求 添加分类
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function() {
            location.reload();
        }
    })

    // 阻止表单默认提交行为
    return false;
});

// 发送ajax请求 向服务端获取所有分类列表数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        // 将服务端返回的数据和html模板进行拼接
        var html = template('categoryListTpl', { data: response });
        // 将拼接好的内容放到页面中
        $('#categoryBox').html(html);
    }
});

// 为编辑按钮添加点击事件
$('#categoryBox').on('click', '.edit', function() {
    // 获取要修改的分类数据的id
    var id = $(this).attr('data-id');
    // 根据id获取分类数据的详细信息
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function(response) {
            var html = template('modifyCategoryTpl', response);
            $('#formBox').html(html);
        }
    })
});

// 当修改分类数据表单发生提交行为的时候
$('#formBox').on('submit', '#modifyCategory', function() {
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // 获取要修改的分类id
    var id = $(this).attr('data-id');
    // 发送请求 修改分类数据
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function() {
            location.reload();
        }
    })

    //阻止表单默认提交行为
    return false;
});

// 当删除按钮被点击的时候
$('#categoryBox').on('click', '.delete', function() {
    if (confirm('您真的要执行删除操作吗')) {
        // 获取要删除的分类的数据的id
        var id = $(this).attr('data-id');
        // 发送请求 删除数据
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function() {
                location.reload();
            }
        })
    }
})