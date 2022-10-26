<template>
  <section class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1>Usuarios</h1>
        </div>
        <div class="col-sm-6">
          <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item">
              <router-link to="/dashboard">Dashboard</router-link>
            </li>
            <li class="breadcrumb-item active"> Usuarios</li>
          </ol>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-3 offset-md-9">
          <router-link
            to="/usuarios/crear"
            class="btn btn-success float-right"
            ><i class="fas fa-plus"></i>Nuevo Usuario</router-link>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div :class="`alert alert-${notification.type} mb-3`" v-if="openAlert">
            <button type="button" class="close" @click="openAlert = false">×</button>
            {{ notification.message }}
          </div>
          <div class="card">
            <div class="card-body table-responsive p-0">
              <table class="table table-hover text-nowrap">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Telefono</th>
                    <th>e-mail</th>
                    <th>Usuario</th>
                    <th>Password</th>
                    <th>Estado</th>
                    <th class="d-flex justify-content-end">Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="loading">
                    <td colspan="2" class="text-center">Cargando ...</td>
                  </tr>
                  <tr v-if="notFoundRecords">
                    <td colspan="2" class="text-center">¡No se encontraron registros!</td>
                  </tr>
                  <tr
                    v-else
                    v-for="(usuario, i) in usuarios"
                    :key="`usuario-${i}`"
                >
                  <td>{{ usuario.id }}</td>
                  <td>{{ usuario.nombre }}</td>
                  <td>{{ usuario.apellido }}</td>
                  <td>{{ usuario.telefono }}</td>
                  <td>{{ usuario.email }}</td>
                  <td>{{ usuario.usuario }}</td>
                  <td>{{ usuario.password }}</td>
                  <td><span :class="`badge badge-${usuario.estado == 'Activo' ? 'success ':'danger'}`">{{ usuario.estado }}</span></td>
                  <td class="project-actions d-flex justify-content-end">
                    <router-link :to="{name: 'UserShow', params: {id: usuario.id}}"
                                 class="btn btn-secondary btn-sm">
                      <i class="fa fa-external-link-alt"></i>
                    </router-link>
                    <router-link :to="{name: 'UserEdit', params: {id: usuario.id}}"
                                 class="btn btn-info btn-sm ml-1">
                      <i class="fa fa-pencil-alt"></i>
                    </router-link>
                    <a
                        @click="selectDelete(usuario.id)"
                        data-toggle="modal"
                        data-target="#modal-delete"
                        class="btn btn-danger btn-sm ml-1"
                    >
                      <i class="text-white fa fa-trash"></i
                      ></a>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
        <!--Modal para eliminar el registro-->
        <div class="modal fade" data-backdrop="static" id="modal-delete" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Eliminar</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="selectDeletedId = null">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <p>¿Está seguro de eliminar el registro?</p>
          </div>
          <div class="modal-footer justify-content-between">
            <button type="button" class="btn btn-default" data-dismiss="modal" @click="selectDeletedId = null">Cerrar
            </button>
            <button type="button" class="btn btn-danger" data-dismiss="modal" @click="confirmDelete">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {mapActions,mapGetters} from "vuex";

export default {
  name: "Index",
  data() {
    return {
      selectDeletedId: null,
      openAlert: false,
      notification: {
        type: 'success',
        message: ''
      }
    }
  },
  computed: {
    ...mapGetters('user', ['usuarios','loading', 'notFoundRecords'])
  },
  methods: {
    ...mapActions('user', ['index','delete']),
    selectDelete(id) {
      this.selectDeletedId = id;
    },
    confirmDelete() {
      this.delete(this.selectDeletedId)
          .then(res => {
            if (res.status === 204) {
              this.openAlert = true;
              this.notification.type = "success";
              this.notification.message = "¡Registro eliminado éxitosamente!";

              this.index();
            }

            this.selectDeletedId = null;
          })
          .catch(e => {
            if (e.response.status === 500) {
              this.selectDeletedId = null;
              this.openAlert = true;
              this.notification.type = "danger";
              this.notification.message = "¡Ocurrió un error al intententar eliminar el registro!"
            }
          })
    }
  },
  mounted() {
    this.index();
  }
}
</script>

<style>
</style>