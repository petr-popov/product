package popov.product.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class BrandCreationRequest {

    @NotNull
    @Size(max = 255)
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "BrandCreationRequest{" +
                "name='" + name + '\'' +
                '}';
    }
}
