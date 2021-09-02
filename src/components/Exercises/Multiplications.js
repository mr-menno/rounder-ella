import React, { useState , useEffect , useRef } from 'react';

import {
  Container,
  Segment,
  Input,
  Button,
  Message,
  Icon,
} from 'semantic-ui-react';

function Multiplications() {

  let [ready,setReady] = useState(false);
  let [numbers,setNumbers] = useState([]);
  let [level,setLevel] = useState(1);
  let [answer,setAnswer] = useState('');
  let [answered,setAnswered] = useState(false);
  let [questionsDone,setQuestionsDone] = useState([]);
  let [result,setResult] = useState(false);
  let [stats,setStats] = useState({questions:0,correct:0,wrong:0})

  let newQuestion = (limit) => {
    if(numbers.length===0) return { };
    let A = Math.round(Math.random()*10);
    let B = numbers[Math.round(Math.random()*(numbers.length-1))];

    if(Math.random()>0.5) {
      let oldA=A;
      let oldB=B;
      A=oldB;
      B=oldA;
    }

    let question = {
      // level: level,
      question: A + " x " + B + " = ___",
      answer: A*B,
      outcome: -1,
      timeout: 15,
    }

    console.log(limit);
    if(limit===0) {
      setNumbers([]);
      setQuestionsDone([]);
      setReady(false);
      return { question: "All Done!", answer: "All Done", outcome:-1 };
    }
    if(questionsDone.find(q => q.question==question.question)) {
      limit--;
      question = newQuestion(limit);
    }

    console.log(question);
    return question;
  }
  let [question,setQuestion] = useState({}); //useState(newQuestion(numbers.length*10))
  let questionRef = useRef(question);
  questionRef.current = question;


  let checkQuestion = () => {
    setAnswered(true);
    if(parseInt(answer)===question.answer) {
      if(question.outcome===-1) {
        setQuestion({...question,outcome:0})
        if(stats.correct+1===20) setLevel(2);
        if(stats.correct+1===40) setLevel(3);
        setStats({...stats,correct:stats.correct+1,questions:stats.questions+1});
      }
      setQuestionsDone([...questionsDone,question])
      setResult(true)
      setTimeout(() => {
        setAnswered(false);
        setAnswer('');
        setQuestion(newQuestion(numbers.length*20))
      },500)
    } else {
      if(question.outcome===-1) {
        setQuestion({...question,outcome:0})
        setStats({...stats,wrong:stats.wrong+1,questions:stats.questions+1});
      }
      setResult(false);
      setTimeout(() => {
        setAnswer('');
        setAnswered(false);
      },1000)
    }
    // setQuestion(newQuestion());
  }
  let checkQuestionRef = useRef(checkQuestion);
  checkQuestionRef.current = checkQuestion;
  

  if(!ready) {
    return (
      <Container>
        <Segment>Which numbers?</Segment>
        <Segment>
          {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(c => (
            <Button primary={numbers.includes(c)} className="choices" size="medium" active={false} focus={false} onClick={() => {
              if(!numbers.includes(c)) setNumbers([...numbers,c]);
              else setNumbers(numbers.filter(n => n!==c));
            }}>{c}</Button>
          ))}
        </Segment>
        {numbers.length>0 ? <Segment>
          <Button className='mt-1em mb-1em' fluid color="green" onClick={() => {
            setReady(true);
            setQuestion(newQuestion(numbers.length*20));
          }} size="huge">LET'S GO!!</Button>
        </Segment> : null}
      </Container>
    );
  }
  
  useEffect(() => {
    const timer = setInterval(() => {
      let old_timeout = questionRef.current.timeout;
      let new_timeout = old_timeout - 1;
      if(new_timeout<0) new_timeout=0;
      setQuestion({...questionRef.current,timeout:new_timeout});
      if(old_timeout > 0 && new_timeout==0) {
        setImmediate(checkQuestionRef.current);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (

    <Container>
        <Segment>
          <h3>solve the following<br />Level: {question.level}</h3>
        </Segment>
        <Segment>
          <h1>{question.question}</h1>
        </Segment>
        <Input type="number" pattern="\d*" value={answer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} onChange={(e,data) => {
            setAnswer(data.value.replace(/,/g,''));
            // if(parseInt(data.value)===question.answer) {
            //   console.log(data.value,question.answer);
            //   checkQuestion(data.value);
            // }
          }}
          onKeyDown={(e) => { if(e.key === 'Enter') { checkQuestion() }}}
          placeholder='answer' fluid size="massive" focus={true} className="number-input"/>
        {answered ? (result ? <Message
          positive
          header='Nice work!'
        /> : <Message
          negative
          header='Try again' />) :
        <Button className='mt-1em mb-1em' fluid color="green" onClick={checkQuestion} size="huge">{question.timeout>0 ? "checking in "+question.timeout+" s." : "check now"}</Button>}
        <Button.Group fluid className='mt-1em' >
          <Button primary icon labelPosition='left'>{stats.questions}<Icon name='hashtag' /></Button>
          <Button positive icon labelPosition='left'>{stats.correct}<Icon name='check' /></Button>
          <Button negative icon labelPosition='left'>{stats.wrong}<Icon name='close' /></Button>
        </Button.Group>
    </Container>
  );
}

export default Multiplications;
