package com.hd.springboot.backend.apirest.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.hd.springboot.backend.apirest.model.entity.Cliente;

public interface IClienteDao extends CrudRepository<Cliente, Long>{

}
