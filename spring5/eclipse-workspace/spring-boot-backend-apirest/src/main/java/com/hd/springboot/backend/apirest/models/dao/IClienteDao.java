package com.hd.springboot.backend.apirest.models.dao;


import org.springframework.data.jpa.repository.JpaRepository;

import com.hd.springboot.backend.apirest.model.entity.Cliente;

public interface IClienteDao extends JpaRepository<Cliente, Long>{

}
