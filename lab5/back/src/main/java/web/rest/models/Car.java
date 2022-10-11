package web.rest.models;

import com.sun.jdi.request.StepRequest;

import javax.persistence.*;

@Entity
public class Car {
    @Id
    private String id;
    private String mark;
    private int power;
    private int speed;

    public Car(String id, String mark, int power, int speed) {
        this.id = id;
        this.mark = mark;
        this.power = power;
        this.speed = speed;
    }

    public Car() {
    }

    @Override
    public String toString() {
        return "Car{" +
                "id=" + id +
                ", mark='" + mark + '\'' +
                ", power=" + power +
                ", speed=" + speed +
                '}';
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMark() {
        return mark;
    }

    public void setMark(String mark) {
        this.mark = mark;
    }

    public int getPower() {
        return power;
    }

    public void setPower(int power) {
        this.power = power;
    }

    public int getSpeed() {
        return speed;
    }

    public void setSpeed(int speed) {
        this.speed = speed;
    }
}
