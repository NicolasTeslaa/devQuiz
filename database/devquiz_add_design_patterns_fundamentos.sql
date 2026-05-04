USE devquiz;

START TRANSACTION;

UPDATE questions
SET CorrectAnswer = CASE CorrectAnswer
  WHEN 'A' THEN OptionA
  WHEN 'B' THEN OptionB
  WHEN 'C' THEN OptionC
  WHEN 'D' THEN OptionD
  ELSE CorrectAnswer
END
WHERE CorrectAnswer IN ('A', 'B', 'C', 'D');

INSERT INTO technologies (Id, Name)
VALUES
('9d3d7b95-2d07-46c7-9a7b-6ed0d0e646a2', 'Design Patterns'),
('c665a578-0892-48d6-9706-748a4b50af29', 'Fundamentos de Programacao')
ON DUPLICATE KEY UPDATE Name = VALUES(Name);

INSERT INTO questions
(Id, ExternalId, Text, OptionA, OptionB, OptionC, OptionD, CorrectAnswer, TechnologyId, ExperienceLevel)
VALUES
('8c8b87b6-9249-456b-8e06-75bb94488a56', 201, 'Qual problema o Singleton tenta resolver?', 'Garantir que uma classe tenha apenas uma instancia controlada', 'Criar objetos sem construtor', 'Transformar objetos em JSON', 'Dividir uma classe em varias tabelas', 'Garantir que uma classe tenha apenas uma instancia controlada', '9d3d7b95-2d07-46c7-9a7b-6ed0d0e646a2', 3),
('c32f1375-2f0d-4e05-b4d6-778f03210d8f', 202, 'Qual pattern cria familias de objetos relacionados sem acoplar o codigo a classes concretas?', 'Adapter', 'Abstract Factory', 'Observer', 'Command', 'Abstract Factory', '9d3d7b95-2d07-46c7-9a7b-6ed0d0e646a2', 3),
('3d39a7d7-ef75-4068-9f50-54ebda35017b', 203, 'Quando o Factory Method costuma ser indicado?', 'Quando subclasses devem decidir qual objeto concreto criar', 'Quando um objeto precisa notificar varios ouvintes', 'Quando uma interface precisa ser traduzida para outra', 'Quando uma operacao precisa ser desfeita', 'Quando subclasses devem decidir qual objeto concreto criar', '9d3d7b95-2d07-46c7-9a7b-6ed0d0e646a2', 3),
('6febef16-ae41-4f81-85cf-3519291e03ac', 204, 'Qual pattern e mais adequado para adaptar uma classe existente a uma interface esperada pelo cliente?', 'Adapter', 'Builder', 'Strategy', 'Prototype', 'Adapter', '9d3d7b95-2d07-46c7-9a7b-6ed0d0e646a2', 3),
('95a95f55-8a98-4270-a827-07c7096081bb', 205, 'Qual pattern permite trocar algoritmos em tempo de execucao mantendo a mesma interface?', 'State', 'Strategy', 'Facade', 'Composite', 'Strategy', '9d3d7b95-2d07-46c7-9a7b-6ed0d0e646a2', 3),
('1cd700b6-1429-4d96-8159-3c17d71df807', 206, 'Qual pattern define uma relacao um-para-muitos para notificar dependentes quando o estado muda?', 'Observer', 'Decorator', 'Mediator', 'Proxy', 'Observer', '9d3d7b95-2d07-46c7-9a7b-6ed0d0e646a2', 3),
('93f07fbd-7cc2-4d99-926d-cfa67b81926f', 207, 'Qual pattern adiciona comportamento a um objeto sem alterar sua classe original?', 'Decorator', 'Iterator', 'Singleton', 'Factory Method', 'Decorator', '9d3d7b95-2d07-46c7-9a7b-6ed0d0e646a2', 3),
('56f10d14-7797-4a26-a66d-d8c7e1f25ad6', 208, 'Qual pattern fornece uma interface simplificada para um subsistema complexo?', 'Facade', 'Bridge', 'Visitor', 'Memento', 'Facade', '9d3d7b95-2d07-46c7-9a7b-6ed0d0e646a2', 3),
('4f90dfd2-04bf-44e4-9d81-958e37ca971e', 209, 'Qual pattern encapsula uma solicitacao como objeto?', 'Command', 'Composite', 'Flyweight', 'Adapter', 'Command', '9d3d7b95-2d07-46c7-9a7b-6ed0d0e646a2', 3),
('6c033709-487d-4368-af87-f3b62b5e7560', 210, 'Qual pattern permite tratar objetos individuais e composicoes de objetos de forma uniforme?', 'Composite', 'Proxy', 'Builder', 'Observer', 'Composite', '9d3d7b95-2d07-46c7-9a7b-6ed0d0e646a2', 3),
('c50a7c13-1f79-4f7b-b92d-8958cedb0f17', 211, 'Qual pattern separa a abstracao da implementacao para que ambas variem independentemente?', 'Bridge', 'State', 'Template Method', 'Singleton', 'Bridge', '9d3d7b95-2d07-46c7-9a7b-6ed0d0e646a2', 3),
('d5cf2f41-a980-493c-b0d3-c7e7694fe2c6', 212, 'Qual pattern controla acesso a outro objeto, podendo adicionar cache, seguranca ou lazy loading?', 'Proxy', 'Facade', 'Prototype', 'Iterator', 'Proxy', '9d3d7b95-2d07-46c7-9a7b-6ed0d0e646a2', 3),
('20d846c3-2bfe-4ed8-9203-a0d1f022a5c4', 213, 'Qual pattern constroi objetos complexos passo a passo?', 'Builder', 'Adapter', 'Command', 'Strategy', 'Builder', '9d3d7b95-2d07-46c7-9a7b-6ed0d0e646a2', 3),
('b3e830cf-1626-426d-a2ff-1f1cb30f5779', 214, 'Qual pattern cria novos objetos copiando uma instancia existente?', 'Prototype', 'Factory Method', 'Mediator', 'Decorator', 'Prototype', '9d3d7b95-2d07-46c7-9a7b-6ed0d0e646a2', 3),
('d2486a81-710d-4b99-bb0f-48bc69e3d0e0', 215, 'Qual pattern centraliza comunicacao entre objetos para reduzir acoplamento direto?', 'Mediator', 'Iterator', 'Composite', 'Flyweight', 'Mediator', '9d3d7b95-2d07-46c7-9a7b-6ed0d0e646a2', 3),
('c21ec8a8-d2fe-4de4-b6ea-ea337f3c74f9', 216, 'Qual pattern altera comportamento quando o estado interno do objeto muda?', 'State', 'Strategy', 'Facade', 'Adapter', 'State', '9d3d7b95-2d07-46c7-9a7b-6ed0d0e646a2', 3),
('119bc78f-03f7-44d0-935a-35735e1f7c16', 217, 'Qual pattern define o esqueleto de um algoritmo e deixa etapas especificas para subclasses?', 'Template Method', 'Observer', 'Builder', 'Proxy', 'Template Method', '9d3d7b95-2d07-46c7-9a7b-6ed0d0e646a2', 3),
('8708de9e-f275-4a3a-9429-b6ee057bca2c', 218, 'Qual pattern percorre elementos de uma colecao sem expor sua representacao interna?', 'Iterator', 'Singleton', 'Bridge', 'Command', 'Iterator', '9d3d7b95-2d07-46c7-9a7b-6ed0d0e646a2', 3),
('518d8bb3-e4f8-4cb2-a96c-9a18295ecbbf', 219, 'Qual pattern permite adicionar novas operacoes a estruturas de objetos sem mudar suas classes?', 'Visitor', 'Decorator', 'Abstract Factory', 'Adapter', 'Visitor', '9d3d7b95-2d07-46c7-9a7b-6ed0d0e646a2', 3),
('32637d4f-48eb-4dcb-b8a2-b423ca958020', 220, 'Qual pattern economiza memoria compartilhando estado comum entre muitos objetos pequenos?', 'Flyweight', 'Facade', 'State', 'Mediator', 'Flyweight', '9d3d7b95-2d07-46c7-9a7b-6ed0d0e646a2', 3),
('7d995295-f46f-42e1-ac24-19286f5f7df4', 221, 'Em POO, o que encapsulamento busca proteger?', 'Detalhes internos e invariantes do objeto', 'Apenas nomes de arquivos', 'A ordem dos imports', 'O endereco fisico do servidor', 'Detalhes internos e invariantes do objeto', 'c665a578-0892-48d6-9706-748a4b50af29', 3),
('9cb9d8d6-39c9-443e-b1f8-06403f71aecf', 222, 'Qual conceito de POO permite tratar subclasses por meio do contrato da classe base?', 'Polimorfismo', 'Serializacao', 'Normalizacao', 'Compilacao', 'Polimorfismo', 'c665a578-0892-48d6-9706-748a4b50af29', 3),
('d6f5b8dd-6ff7-4d01-82ef-522d219f8459', 223, 'Qual pratica evita violar encapsulamento em objetos de dominio?', 'Expor campos publicos para qualquer alteracao', 'Fornecer metodos que preservam regras de negocio', 'Usar apenas classes estaticas', 'Salvar tudo como string', 'Fornecer metodos que preservam regras de negocio', 'c665a578-0892-48d6-9706-748a4b50af29', 3),
('7aafecf4-2808-48b1-a086-0950507fe313', 224, 'No SOLID, o que o SRP recomenda?', 'Uma classe deve ter um unico motivo para mudar', 'Uma classe deve ter muitos bancos', 'Uma classe nao deve ter metodos', 'Uma classe deve depender de detalhes concretos', 'Uma classe deve ter um unico motivo para mudar', 'c665a578-0892-48d6-9706-748a4b50af29', 3),
('4825d626-0f4c-4290-a2d7-f87282158919', 225, 'No SOLID, qual ideia resume o Open/Closed Principle?', 'Aberto para extensao e fechado para modificacao', 'Aberto para heranca obrigatoria', 'Fechado para testes automatizados', 'Aberto para acesso global', 'Aberto para extensao e fechado para modificacao', 'c665a578-0892-48d6-9706-748a4b50af29', 3),
('a9909e89-8660-4d9e-8096-cfb632f8281f', 226, 'O que o Liskov Substitution Principle exige?', 'Subtipos devem poder substituir seus tipos base sem quebrar o comportamento esperado', 'Subclasses devem remover metodos herdados', 'Classes devem usar apenas heranca multipla', 'Interfaces devem depender de banco de dados', 'Subtipos devem poder substituir seus tipos base sem quebrar o comportamento esperado', 'c665a578-0892-48d6-9706-748a4b50af29', 3),
('438a7e71-ebd9-4056-a5bd-c82a259814c5', 227, 'O que o Interface Segregation Principle evita?', 'Interfaces grandes que obrigam clientes a depender do que nao usam', 'Classes pequenas demais', 'Construtores com parametros', 'Testes de unidade', 'Interfaces grandes que obrigam clientes a depender do que nao usam', 'c665a578-0892-48d6-9706-748a4b50af29', 3),
('636b1e20-0f9e-4ed2-a047-21a4f284eff7', 228, 'O que o Dependency Inversion Principle recomenda?', 'Depender de abstracoes, nao de detalhes concretos', 'Depender sempre de classes finais', 'Evitar interfaces', 'Colocar SQL dentro da entidade', 'Depender de abstracoes, nao de detalhes concretos', 'c665a578-0892-48d6-9706-748a4b50af29', 3),
('858df6ff-4caf-4fa8-ba01-cc37c3e234bf', 229, 'Em DDD, o que e uma entidade?', 'Objeto com identidade propria ao longo do tempo', 'Objeto definido apenas por seus valores', 'Classe usada somente para logs', 'Tabela sem chave primaria', 'Objeto com identidade propria ao longo do tempo', 'c665a578-0892-48d6-9706-748a4b50af29', 3),
('49fc3e2e-b8d5-4e87-ae52-40c958948071', 230, 'Em DDD, o que e um Value Object?', 'Objeto definido por seus atributos e sem identidade propria', 'Servico HTTP externo', 'Tabela de auditoria', 'Objeto que precisa ter id global', 'Objeto definido por seus atributos e sem identidade propria', 'c665a578-0892-48d6-9706-748a4b50af29', 3),
('3274602e-2dc3-465a-a5d6-a05f923ad70e', 231, 'Qual papel de um Aggregate Root em DDD?', 'Controlar acesso e consistencia de um conjunto de objetos relacionados', 'Substituir todos os repositories', 'Renderizar componentes de tela', 'Guardar senha em texto puro', 'Controlar acesso e consistencia de um conjunto de objetos relacionados', 'c665a578-0892-48d6-9706-748a4b50af29', 3),
('d2875db6-32e3-40f5-9e7d-ae1c70b1c1c0', 232, 'Qual camada deve concentrar regras essenciais de negocio em uma arquitetura orientada a dominio?', 'Dominio', 'Infraestrutura', 'Interface grafica', 'Scripts de deploy', 'Dominio', 'c665a578-0892-48d6-9706-748a4b50af29', 3),
('0816d86b-820c-4ffc-bbf0-763139ff01fa', 233, 'Qual responsabilidade combina melhor com um Repository em DDD?', 'Persistir e recuperar agregados abstraindo detalhes de armazenamento', 'Validar regras de CSS', 'Construir botoes da tela', 'Executar alertas visuais', 'Persistir e recuperar agregados abstraindo detalhes de armazenamento', 'c665a578-0892-48d6-9706-748a4b50af29', 3),
('5d352e4a-6a6a-478a-b353-3de53eeb33f7', 234, 'O que e um Bounded Context?', 'Limite onde um modelo de dominio e linguagem possuem significado consistente', 'Um tipo de loop infinito', 'Um cache de imagens', 'Um branch protegido no Git', 'Limite onde um modelo de dominio e linguagem possuem significado consistente', 'c665a578-0892-48d6-9706-748a4b50af29', 3),
('5249cc36-69d1-4e9e-bbcb-8f7bfe8789ba', 235, 'Qual pratica combina melhor com Ubiquitous Language?', 'Usar termos do negocio de forma consistente entre time e codigo', 'Trocar nomes a cada sprint', 'Usar apenas abreviacoes tecnicas internas', 'Evitar conversa com especialistas do dominio', 'Usar termos do negocio de forma consistente entre time e codigo', 'c665a578-0892-48d6-9706-748a4b50af29', 3),
('e610b3b4-0646-44c5-9eb3-6252ff8e1897', 236, 'Qual alternativa representa melhor alta coesao?', 'Elementos de um modulo colaboram para uma responsabilidade clara', 'Uma classe executa tarefas sem relacao', 'Cada metodo acessa qualquer tabela', 'Toda regra fica no controller', 'Elementos de um modulo colaboram para uma responsabilidade clara', 'c665a578-0892-48d6-9706-748a4b50af29', 3),
('1825aa8a-9fd7-4d53-8fbf-819d21cb306a', 237, 'Qual alternativa representa melhor baixo acoplamento?', 'Modulos conhecem pouco sobre detalhes internos uns dos outros', 'Todos os modulos dependem de uma classe global', 'Objetos alteram campos internos de outros diretamente', 'Controllers instanciam toda infraestrutura manualmente', 'Modulos conhecem pouco sobre detalhes internos uns dos outros', 'c665a578-0892-48d6-9706-748a4b50af29', 3),
('20ec811e-4135-4eb2-8a44-0e6ea47c657a', 238, 'Qual principio favorece composicao em vez de heranca quando comportamento precisa variar?', 'Compor objetos por contratos pequenos e claros', 'Criar uma hierarquia profunda para tudo', 'Usar heranca para compartilhar qualquer codigo', 'Evitar interfaces sempre', 'Compor objetos por contratos pequenos e claros', 'c665a578-0892-48d6-9706-748a4b50af29', 3),
('c1499c0f-a58e-434d-a3fb-e5d8015de912', 239, 'Qual sinal indica que uma classe pode estar violando SRP?', 'Ela mistura regra de negocio, persistencia e formatacao de tela', 'Ela possui nome claro', 'Ela possui testes', 'Ela recebe dependencias por construtor', 'Ela mistura regra de negocio, persistencia e formatacao de tela', 'c665a578-0892-48d6-9706-748a4b50af29', 3),
('477e250c-0f75-4ae7-b665-6c2f0c6022e8', 240, 'Em DDD, quando uma regra nao pertence naturalmente a uma entidade ou value object, qual alternativa pode ser adequada?', 'Domain Service', 'CSS Module', 'HTML Template', 'Git Hook', 'Domain Service', 'c665a578-0892-48d6-9706-748a4b50af29', 3)
ON DUPLICATE KEY UPDATE
Text = VALUES(Text),
OptionA = VALUES(OptionA),
OptionB = VALUES(OptionB),
OptionC = VALUES(OptionC),
OptionD = VALUES(OptionD),
CorrectAnswer = VALUES(CorrectAnswer),
TechnologyId = VALUES(TechnologyId),
ExperienceLevel = VALUES(ExperienceLevel);

COMMIT;
