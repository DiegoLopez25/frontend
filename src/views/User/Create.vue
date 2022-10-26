<template>
   <section class="content-header">
      <div class="container-fluid">
         <div class="row mb-2">
            <div class="col-sm-6">
               <h1>Crear Usuario</h1>
            </div>
            <div class="col-sm-6">
               <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item">
                     <router-link to="/dashboard">Dashboard</router-link>
                  </li>
                  <li class="breadcrumb-item">
                     <router-link :to="{ name: 'UserIndex' }"
                        >Usuarios</router-link
                     >
                  </li>
                  <li class="breadcrumb-item active">Crear Usuario</li>
               </ol>
            </div>
         </div>
         <div class="row mb-3">
            <div class="col-md-3 offset-md-9">
               <router-link
                  :to="{ name: 'UserIndex' }"
                  class="btn btn-secondary float-right"
               >
                  <i class="fas fa-arrow-circle-left"></i>
                  Regresar
               </router-link>
            </div>
         </div>
         <div :class="`alert alert-${notification.type} mt-5`" v-if="openAlert">
            <button type="button" class="close" @click="openAlert = false">×</button>
            {{ notification.message }}
          </div>
         <div class="row">
            <div class="col-12">
               <form v-on:submit.prevent="submitForm">
                  <div class="card card-outline card-success">
                     <div class="card-header">
                        <h3 class="card-title">Nuevo Usuario</h3>
                     </div>
                     <div class="card-body">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                              <label for="">Nombre:</label>
                              <input
                                type="text"
                                class="form-control"
                                :class="{ 'is-invalid': vErrors.nombre }"
                                v-model="user.nombre"
                              />
                              <span class="text-danger text-sm" v-if="vErrors.nombre">
                                {{ vErrors.nombre }}
                              </span>
                          </div>
                          <div class="form-group">
                              <label for="">Apellido:</label>
                              <input 
                                type="text" 
                                class="form-control"     
                                :class="{ 'is-invalid': vErrors.apellido }"
                                v-model="user.apellido"/>
                              <span class="text-danger text-sm" v-if="vErrors.apellido">
                                {{ vErrors.apellido }}
                              </span>
                          </div>
                          <div class="form-group">
                              <label for="">Telefono:</label>
                              <input 
                                type="text" 
                                class="form-control" 
                                :class="{ 'is-invalid': vErrors.telefono }"
                                v-model="user.telefono"
                              />
                              <span class="text-danger text-sm" v-if="vErrors.telefono">
                                {{ vErrors.telefono }}
                              </span>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                              <label for="">e-mail:</label>
                              <input 
                                type="text" 
                                class="form-control" 
                                :class="{ 'is-invalid': vErrors.email }"
                                v-model="user.email"
                              />
                              <span class="text-danger text-sm" v-if="vErrors.email">
                                {{ vErrors.email }}
                              </span>
                          </div>
                          <div class="form-group">
                              <label for="">Usuario:</label>
                              <input 
                                type="text" 
                                class="form-control" 
                                :class="{ 'is-invalid': vErrors.email }"
                                v-model="user.usuario"
                              />
                              <span class="text-danger text-sm" v-if="vErrors.usuario">
                                {{ vErrors.usuario }}
                              </span>
                          </div>
                          <div class="form-group">
                              <label for="">Password:</label>
                              <input 
                                type="text" 
                                class="form-control" 
                                :class="{ 'is-invalid': vErrors.password }"
                                v-model="user.password"
                                />
                              <span class="text-danger text-sm" v-if="vErrors.password">
                                {{ vErrors.password }}
                              </span>
                          </div>
                        </div>
                     </div>
                     <div class="card-footer">
                        <button type="submit" class="btn btn-success">
                           <i class="fas fa-save"></i> {{ sending ? 'Guardando...' : 'Guardar' }}
                        </button>
                     </div>
                    </div>
                  </div>
               </form>
            </div>
         </div>
      </div>
   </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
   name: "Create",
   data() {
      return {
         sending: false,
         openAlert: false,
         notification: {
            type: "success",
            message: "",
         },
      };
   },
   computed: {
      ...mapGetters({
         user: "user/usuario",
         vErrors: "errors",
      }),
   },
   methods :{
    ...mapActions('user', ['usuario', 'resetState']),
    submitForm(){
      this.sending = true;
      this.usuario()
          .then(res => {
            if (res.status === 201) {
              this.openAlert = true;
              this.notification.type = 'success';
              this.notification.message = res.data.message
            }
            this.sending = false;

            this.resetState();
          }).catch(e => {
            this.sending = false;
            if (e.response.status === 500) {
              this.openAlert = true;
              this.notification.type = 'danger';
              this.notification.message = 'Ocurrió un error al intentar guardar el registro';
            }
          });
    }
   },
  beforeUnmount() {
    this.resetState();
  }
};
</script>

<style>
</style>