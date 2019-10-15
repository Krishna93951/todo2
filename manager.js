function StorageManager(storageType, key) {

  this.storageType= storageType,
  this.key=key,
  
  this.setData= function (data) {
      getStorageInstance(this.storageType,this.key).setData(data);
  },
  this.getData= function () {
      return getStorageInstance(this.storageType,this.key).getData();
  }
};

function getStorageInstance(storageType,key) {
var test = {
  'LocalStorage' : function () { return new LocalStorage(key) },

  'SessionStorage' : function () { return new SessionStorage(key) }
}
return test[storageType]();
}