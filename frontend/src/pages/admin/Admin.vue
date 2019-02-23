<template>
      <div class = 'columns is-fullheight'>
            <aside class="menu column is-sidebar-menu is-one-fifth is-dark">
                <ul class = 'menu-list'>
                    <li><router-link to='/admin/dashboard'>Dashboard</router-link></li>
                    <li><router-link to="/admin/products">View Products</router-link></li>
                    <li><router-link to="/admin/createproduct">Create Product</router-link></li>
                </ul>
            </aside>

            <div class = 'column is-main-content'>
                <!-- Outlet for children routes -->
                <router-view></router-view>
            </div>
        </div>
</template>
