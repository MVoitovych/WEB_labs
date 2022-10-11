package web.rest.controller;


import org.springframework.data.jpa.repository.JpaRepository;
import web.rest.models.Car;

public interface CarRepository extends JpaRepository<Car, String> {

}
