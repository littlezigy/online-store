<template>
  <div>
    <div class="admin-new">
      <div class="container">
        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
          <ul class="admin-menu">
            <!-- Links are to sibling routes -->
            <li><router-link to='/admin'>Dashboard</router-link></li>
            <li><router-link to="/admin/products">View Products</router-link></li>
            <li><router-link to="/admin/createproduct">Create Product</router-link></li>
          </ul>
        </div>
        <!-- Outlet for children routes -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
