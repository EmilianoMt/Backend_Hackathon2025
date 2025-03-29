import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto'
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) 
    private userRepository: Model<User>,
    
  ) {}
  async registerUser(createUserDto: CreateUserDto){
    const existingUser = await this.userRepository.findOne({
      where: { userEmail: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('El correo electrónico ya está en uso');
    }

    createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);
    return this.userRepository.create(createUserDto);
  }

  async loginUser(loginUserDto: LoginUserDto){
    console.log(loginUserDto);
    
    const user = await this.userRepository.findOne({ email: loginUserDto.email });

    console.log(user);
    

    if (!user) throw new UnauthorizedException('Credenciales invalidas');
    const match = await bcrypt.compare(
      loginUserDto.password, 
      user.password
    )
    if (!match) throw new UnauthorizedException('Credenciales invalidas');


    return user;
  }

  findOne(id: number) {
    const user = this.userRepository.findOne({ where: { id } });
    if (!user) throw new UnauthorizedException('Usuario no encontrado');
    return user;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    const user = this.userRepository.findOne({ where: { id } })
    if (!user) throw new UnauthorizedException('Usuario no encontrado');
    if (updateAuthDto.password) {
      updateAuthDto.password = bcrypt.hashSync(updateAuthDto.password, 10);
    }
    return this.userRepository.updateOne({ id }, updateAuthDto);
  }

  remove(id: number) {
    const user = this.userRepository.findOne({ where: { id } })
    if (!user) throw new UnauthorizedException('Usuario no encontrado');
    return this.userRepository.deleteOne({ id });
  }
}
