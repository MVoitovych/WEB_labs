package web.rest.controller;

import org.springframework.stereotype.Service;
import web.rest.models.Car;

import java.util.List;
import java.util.Optional;

@Service
public class CarService {

    private final CarRepository carRepository;

    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    List<Car> list() {
        return carRepository.findAll();
    }

    void add(Car car) {
        carRepository.save(car);
    }

    void delete(String carId) {
        carRepository.deleteById(carId);
    }

    public void update(Car car) {
        Optional<Car> row = carRepository.findById(car.getId());
        if (row.isPresent()) {
            Car tempCar = row.get();
            if (!car.getMark().isEmpty()) {
                tempCar.setMark(car.getMark());
            }

            if (car.getSpeed() != 0) {
                tempCar.setSpeed(car.getSpeed());
            }

            if (car.getPower() != 0) {
                tempCar.setPower(car.getPower());
            }
            carRepository.save(tempCar);
        }

    }
}
