<h2>How to setup application:</h2>
<ul>
    <li>run <code>docker run -p 3000:3000 expletech-test-case</code></li>
    <li>Go to <code>http://localhost:3000</code></li>
</ul>

<h2>How to use User API</h2>
<ul>
    <li>
    POST <code>/signup</code> to create new user (this user automatically gets JWT-token)
        <code>
            <pre>
                {
                    email: user@gmail.com,
                    username: user,
                    password: userpass,
                    (optional) role: "user"
                }
            </pre>
        </code>
    </li>
    <li>
        POST <code>/login</code> to get JWT-token 
        <code>
            <pre>
                {
                    email: user@gmail.com,
                    password: userpass
                }
            </pre>
        </code>
    </li>
    <li>
        GET <code>/logout</code> to delete JWT-token
    </li>
</ul>

<h2>How to use Task API</h2>
<ul>
    <li>
    POST <code>/new-task</code> to create new task
        <code>
            <pre>
                {
                    title: "Task Title",
                    description: "Some description",
                    (sets automatically) author: ObjectId
                }
            </pre>
        </code>
    </li>
    <li>
        PUT <code>/update-task/:id</code> to delete JWT-token
        <code>
            <pre>
                {
                    title: "New Task Title",
                    description: "Some new description",
                }
            </pre>
        </code>
    </li>
    <li>
        DELETE <code>/task/:id</code> to delete task by id
    </li>
    <li>
        GET <code>/tasks</code> to get all tasks that belong to current user
    </li>
    <li>
        GET <code>/task/:id</code> to get task by id if it belongs to current user
    </li>
    <li>
        GET <code>/all-tasks</code> to get all tasks of all users (only with admin permission)
    </li>
</ul>