package popov.product.mapper;

import org.mapstruct.Mapper;
import popov.product.domain.Brand;
import popov.product.dto.BrandCreationRequest;
import popov.product.dto.BrandDto;

@Mapper(componentModel = "spring")
public interface BrandMapper {

    BrandDto toDto(Brand entity);

    Brand creationRequestToEntity(BrandCreationRequest creationRequest);

}
