package popov.product.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import popov.product.domain.Brand;
import popov.product.dto.BrandCreationRequest;
import popov.product.dto.BrandDto;
import popov.product.mapper.BrandMapper;
import popov.product.repository.BrandRepository;


@Service
@Transactional
public class BrandService {

    private BrandMapper brandMapper;
    private BrandRepository brandRepository;

    public BrandService(BrandMapper brandMapper, BrandRepository brandRepository) {
        this.brandMapper = brandMapper;
        this.brandRepository = brandRepository;
    }

    public BrandDto save(BrandCreationRequest brandDto) {
        Brand brand = brandMapper.creationRequestToEntity(brandDto);
        brand = brandRepository.save(brand);
        return brandMapper.toDto(brand);
    }

    public BrandDto find(Long id) {
        Brand brand = brandRepository.findOne(id);
        return brandMapper.toDto(brand);
    }
}
